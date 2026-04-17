import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(`${requestUrl.origin}/auth?error=auth_callback_error`)
      }

      // Если это новый пользователь, отправляем уведомление в Telegram
      if (data.user && data.session) {
        // Проверяем, новый ли это пользователь (по времени создания)
        const userCreatedAt = new Date(data.user.created_at)
        const now = new Date()
        const timeDiff = now.getTime() - userCreatedAt.getTime()
        const isNewUser = timeDiff < 60000 // Если аккаунт создан менее минуты назад

        if (isNewUser) {
          try {
            // Отправляем уведомление в Telegram
            await fetch(`${requestUrl.origin}/api/telegram/notify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                event_type: 'user.created',
                user: {
                  id: data.user.id,
                  email: data.user.email,
                  created_at: data.user.created_at,
                  user_metadata: data.user.user_metadata,
                  app_metadata: data.user.app_metadata
                }
              })
            })
          } catch (telegramError) {
            console.error('Failed to send Telegram notification:', telegramError)
            // Не прерываем процесс авторизации из-за ошибки уведомления
          }
        }
      }

      // Redirect to P2P page
      return NextResponse.redirect(`${requestUrl.origin}/p2p`)
      
    } catch (error) {
      console.error('Unexpected error in auth callback:', error)
      return NextResponse.redirect(`${requestUrl.origin}/auth?error=unexpected_error`)
    }
  }

  // Если нет кода, перенаправляем на страницу авторизации
  return NextResponse.redirect(`${requestUrl.origin}/auth`)
}