import React, { useEffect, useState } from "react";
import { Bookmark_page_card } from "./Card"
import { css as toastcss } from 'glamor'
import { toast, ToastContainer } from "react-toastify";

function Bookmark() {
    var data = JSON.parse(localStorage.getItem("bookmark") || "[]");
    const init = localStorage.getItem("count");
    const [number, setNum] = useState(init);
    
    // handle callback from each card, delete the corresponding card
    function handleChange(title) {
        let cur = localStorage.getItem("count");
        setNum(cur);
        console.log("Confirm title", title)
        ToastOptions(title);
    }

    // display each card
    function createCard(item) {
        return (
            <Bookmark_page_card
                key={item.key}
                Image={item.img}
                Title={item.title}
                Date={item.date}
                Dlink={item.url}
                Source={item.source}
                Section={item.section}
                Mykey={item.Mykey}
                Shareurl={item.Shareurl}
                onChange={handleChange}
            />
        )

    }
    const ToastOptions = (title) => {
        let begin = 'Removing';
        toast(begin + title, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            //pauseOnHover: true,
            draggable: false,
            important: true,
            bodyClassName: toastcss({ color: '#0d0d0d' })
        });
    };

    // if no bookmark stored before
    if (number === 0 || data.length === 0) {
        return ([<h2 style={{ textAlign: 'center', marginTop: '20px' }}>You have no saved articles</h2>, 
        <ToastContainer
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable={false}
            pauseOnHover
    />])
    }
    else {
        console.log("WRI")
        return ([
            <h2>Favorites</h2>,
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable={false}
                pauseOnHover
            />,
            data.map(createCard)]
        )
    }
}

export default Bookmark;