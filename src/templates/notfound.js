export function NotFound() {
    return `
    <html>
    <body>
    <p>Link does not exist, redirect to main page.</p>
    <script>
        var timer = setTimeout(function() {
            window.location='/'
        }, 3000);
    </script>
    </body>
    </html>
    `
}