import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API для отправки заявок на курс с уведомлением на почту'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        email = body.get('email', 'nailiya.harasova@yandex.ru')
        
        if not name or not phone:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Имя и телефон обязательны'}),
                'isBase64Encoded': False
            }
        
        current_time = datetime.now().strftime('%d.%m.%Y %H:%M')
        
        subject = f'Новая заявка на курс "Нейрофотосессия" от {name}'
        
        html_content = f'''
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                    <h2 style="color: #8b5cf6; border-bottom: 2px solid #8b5cf6; padding-bottom: 10px;">
                        📝 Новая заявка на курс
                    </h2>
                    
                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #666; margin-top: 0;">Данные студента:</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Имя:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">{name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Телефон:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">{phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Дата заявки:</strong></td>
                                <td style="padding: 10px; border-bottom: 1px solid #eee;">{current_time}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
                        <p style="margin: 0; color: #856404;">
                            <strong>⚠️ Ожидается подтверждение оплаты</strong><br>
                            Студент должен прислать скриншот перевода на карту:<br>
                            <code style="background: #f5f5f5; padding: 2px 6px; border-radius: 4px;">2204 3204 2826 7423</code>
                        </p>
                    </div>
                    
                    <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-radius: 8px;">
                        <p style="margin: 0; font-size: 14px; color: #0056b3;">
                            💡 После получения подтверждения оплаты, отправьте студенту доступ к курсу.
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 12px;">
                        Это автоматическое уведомление с сайта курса "Нейрофотосессия"
                    </div>
                </div>
            </body>
        </html>
        '''
        
        yandex_smtp = os.environ.get('YANDEX_SMTP_SERVER', 'smtp.yandex.ru')
        yandex_port = int(os.environ.get('YANDEX_SMTP_PORT', '587'))
        sender_email = os.environ.get('YANDEX_EMAIL', 'nailiya.harasova@yandex.ru')
        sender_password = os.environ.get('YANDEX_PASSWORD', '')
        
        if not sender_password:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Не настроена отправка писем'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = email
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        with smtplib.SMTP(yandex_smtp, yandex_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Заявка отправлена'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
