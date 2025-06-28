const mailOptions = (email, verificationToken) => {
  const verificationUrl = `http://localhost:5173/auth/register?token=${verificationToken}`;
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Xác Thực Tài Khoản</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f6f9fc; line-height: 1.6;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 30px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #2a6e78, #4CAF50); padding: 40px 20px; text-align: center; border-top-left-radius: 12px; border-top-right-radius: 12px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Xác Thực Tài Khoản</h1>
            <br/>
            <p style="color: #e0f2e9; font-size: 16px; margin: 10px 0 0;">Tôi Toàn Hảo admin của HChat, Chào mừng bạn đến với ứng dụng chat trực tuyến của chúng tôi!</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding: 30px 20px;">
            <p style="font-size: 18px; color: #1a1a1a; margin: 0 0 15px;">Xin chào,</p>
            <p style="font-size: 16px; color: #333333; margin: 0 0 25px;">Cảm ơn bạn đã đăng ký! Để hoàn tất quá trình đăng ký, vui lòng nhấn vào nút bên dưới để xác thực tài khoản của bạn:</p>
            <table align="center" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding: 15px 0;">
                  <a href="${verificationUrl}" style="display: inline-block; padding: 14px 30px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: background-color 0.3s;">Xác Thực Ngay</a>
                </td>
              </tr>
            </table>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color: #f6f9fc; padding: 20px; text-align: center; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
            <p style="font-size: 14px; color: #666666; margin: 0 0 10px;">Bạn nhận được email này vì bạn đã đăng ký tại HChat.</p>
            <p style="font-size: 12px; color: #999999; margin: 0;">© 2025 YourAppName. Tất cả quyền được bảo lưu.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  return {
    from: process.env.ADMIN_MAIL,
    to: email,
    subject: 'Xác thực tài khoản',
    text: `Click vào link để xác thực: ${verificationUrl}`,
    html: htmlContent,
  };
};

module.exports = { mailOptions };