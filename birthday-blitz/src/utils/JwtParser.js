const decode = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

const getRole = () => {
    let token = localStorage.getItem('AccessToken');
    if (token !== null) {
        let jsonData = decode(token);
        return jsonData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    return 'GUEST';
}

export {getRole};