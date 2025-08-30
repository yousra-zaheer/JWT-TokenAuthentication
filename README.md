# JWT-TokenAuthentication
This application uses JWT tokens to authenticate users and protect the /dashboard route. When a user logs in, a token is generated and sent back to the client. The client must include this token in the Authorization header when accessing the /dashboard route. If the token is valid, the route grants access; otherwise, it denies access.
