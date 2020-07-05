class HTTPServices{
    
    fetchgetAllBook(callback) {
        fetch('http://localhost:8080/verifyaccount/all')
        .then(res => res.json())
        .then(values => callback(values))
     }

     addToCart( bookId, quantity) {
        fetch("http://localhost:8080/home/user/cart/add-update", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    addToWishList(bookId) {
        fetch("http://localhost:8080/home/user/wishlist/add", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    fetchAllCartBook(callback) {
        fetch("http://localhost:8080/home/user/cart/getall", {
            method: 'GET',
            headers: {
                "content-type": "Application/json",
                "token": localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(values => callback(values))
    }

    fetchAllWishlistBooks(callback) {
        fetch("http://localhost:8080/home/user/wishlist/getall", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }})
        .then(res => res.json())
        .then(values => callback(values))
    }

    removeBookFromWishList(bookId){
        fetch("http://localhost:8080/home/user/wishlist/remove", {
        method: 'PUT',
        headers: {
            "content-type": "Application/json",
            "token": localStorage.getItem("token")
        },
        body: JSON.stringify({"bookId": bookId})})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    removeBookFromCart( bookId, quantity){
        fetch("http://localhost:8080/home/user/cart/remove", {
            method: 'PUT',
            headers: {
                "content-type": "Application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({"bookId": bookId, "bookQuantity": quantity})})
            .then(res => res.text())
            .then(res => console.log(res))
    }
    
    fetchAllBookAsc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-asc/price')
        .then(res => res.json())
        .then(values => callback(values))
     }

     fetchAllBookDesc(callback) {
        fetch('http://localhost:8080/verifyaccount/sort-desc/price')
        .then(res => res.json())
        .then(values => callback(values))
     }

     fetchAllSearchBook(searchText, callback) {
        console.log("text", searchText)
        fetch(`http://localhost:8080/verifyaccount/searchbooks/${searchText}`)
        .then(res => res.json())
        .then(values => callback(values))
    }

    signUpData(username, password, email, phoneNo, role) {
        fetch("http://localhost:8080/api/auth/signup", {
        method: 'POST',
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify({
            "email": email, 
            "password": password, 
            "phoneNumber": phoneNo,
            "role": role,
            "username": username
        })})
        .then(res => res.text())
        .then(res => console.log(res))
    }

    signInData(username, password){
        fetch("http://localhost:8080/api/auth/signin", {
            method: 'POST',
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
              })})
            .then(res => res.json())
            .then(res => localStorage.setItem("token", res.accessToken))
    }
    
    forgotPasswordMail(email) {
        fetch("http://localhost:8080/api/auth/forgotpassword", {
            method: 'POST',
            body: (email)
        })
            .then(res => res.text()
                .then(res => console.log("message", res)
                ))
    }

    addCustomerDetails(name, pincode, locality, address, city, landmark, addressType) {
        fetch("http://localhost:8080/home/customer/adddetails", {
            method: 'POST',
            headers: {
                "content-type": "Application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "name": name,
                "pincode": pincode,
                "locality": locality,
                "address": address,
                "city": city,
                "landmark": landmark,
                "addressType": addressType
            })
        })
            .then(res => res.text())
            .then(res => console.log(res))
    }

    OrderId(callback) {
        fetch('http://localhost:8080/home/user/cart/orderplaced/orderid', {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.text())
            .then(values => callback(values))
    }

    placeOrder(callback) {
        fetch('http://localhost:8080/home/user/cart/orderplaced/orderid', {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then(res => res.text())
            .then(values => callback(values))
    }

    isCustomerDetailsExisted(callback) {
        fetch("http://localhost:8080/home/customer/isexisted", {
            method: 'GET',
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then(res => res.text())
        .then(res => callback(res)
        )
    }

    resetPassword(password) {
        fetch("http://localhost:8080/api/auth/resetpassword", {
            method: 'PUT',
            headers: {
                "token": localStorage.getItem("token")
            },
            body: (password)
        })
            .then(res => res.text()
                .then(res => console.log("message", res)
                ))
    }

}

export default HTTPServices;