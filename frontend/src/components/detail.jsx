import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import { Detail_page_card } from "./Card";
import axios from "axios";
import Comment from "./Comment"
import Bounceloader from "react-spinners/BounceLoader";

function createCard(item) {
    return (
        <Detail_page_card
            key={item.key}
            Image={item.image}
            Description={item.description}
            Longdecp={item.longdes}
            Shortdecp={item.shortdes}
            Title={item.title}
            Date={item.date}
            Dlink={item.dlink}
            Source={item.source}
            Section={item.section}
            Mykey={item.Mykey}
            Shareurl={item.shareurl}
        />
    )
}

function createComment(item) {
    return (
        <Comment
            key={item.Mykey}
            idi={item.Mykey} />
    )
}

function Detailed(props) {
    const [data, setData] = useState([]);
    const [loader, setload] = useState(true);
    const NYTdefaultimg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const Gurdiandefaultimg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    let location = useLocation();
    //var url = 'http://localhost:7000/Detail?source=' + location.state.source + "&link=" + location.state.link;
    var url = 'https://h8appbackend.appspot.com/api/Detail?source=' + location.state.source + "&link=" + location.state.link;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url
            );
            setload(false);
            let shortdecp = '';
            let index = '';
            let longdecp = '';
            if (location.state.source == 'G') {
                let cur_img = "";
                if (result.data.response.content.blocks.main.elements[0].assets.length != 0) {
                    cur_img = result.data.response.content.blocks.main.elements[0].assets[result.data.response.content.blocks.main.elements[0].assets.length - 1].file;
                }
                else {
                    cur_img = Gurdiandefaultimg;
                }
                let des = result.data.response.content.blocks.body[0].bodyTextSummary;

                if (des.length <= 650) { shortdecp = des; }
                else {
                    shortdecp = des.substr(0, des.lastIndexOf(' ', 650));
                    index = des.lastIndexOf(' ', 650);
                    longdecp = des.substring(index);
                }
                setData([{
                    key: result.data.response.content.id,
                    title: result.data.response.content.webTitle,
                    image: cur_img,
                    date: result.data.response.content.webPublicationDate.substring(0, 10),
                    description: result.data.response.content.blocks.body[0].bodyTextSummary,
                    shortdes: shortdecp,
                    longdes: longdecp,
                    dlink: result.data.response.content.id,
                    source: "G",
                    section: result.data.response.content.sectionId,
                    Mykey: result.data.response.content.id,
                    shareurl: result.data.response.content.webUrl
                }])
            }
            else if (location.state.source == 'N') {

                let image_url = "";
                for (let i = 0; i < result.data.response.docs[0].multimedia.length; i++) {
                    if (result.data.response.docs[0].multimedia[i].width > 2000) {
                        if (result.data.response.docs[0].multimedia[i].url.substring(0, 5) === "image") {
                            image_url = "https://nyt.com/" + result.data.response.docs[0].multimedia[i].url;
                        }
                        else {
                            image_url = result.data.response.docs[0].multimedia[i].url;
                        }
                        break
                    }
                }
                if (image_url === "") {
                    image_url = NYTdefaultimg;
                }
                let des = result.data.response.docs[0].abstract;
                if (des.length <= 650) { shortdecp = des; }
                else {
                    shortdecp = des.substr(0, des.lastIndexOf(' ', 650));
                    index = des.lastIndexOf(' ', 650);
                    longdecp = des.substring(index);
                }
                setData([{
                    key: result.data.response.docs[0]._id,
                    title: result.data.response.docs[0].headline.main,
                    image: image_url,
                    date: result.data.response.docs[0].pub_date.substring(0, 10),
                    description: result.data.response.docs[0].abstract,
                    shortdes: shortdecp,
                    longdes: longdecp,
                    dlink: result.data.response.docs[0].web_url,
                    source: "N",
                    section: result.data.response.docs[0].section_name,
                    Mykey: result.data.response.docs[0]._id,
                    shareurl: result.data.response.docs[0].web_url
                }])
            }
        };

        fetchData();

    }, []);

    // Avoid block loader icon with expand navigation bar
    let screen_width = window.screen.width;
    let style = null;
    if (screen_width < 900) { style = { position: "fixed", paddingTop: "60%", left: "50%", transform: "translate(-50%, -50%)" }; }
    else { style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }; }
    if (loader) {
        return (<div style={style}><Bounceloader size={60} color={"#123abc"} loading={loader} /><h4 style={{ fontWeight: '600', textAlign: 'center' }}>Loading</h4></div>)
    }
    else {
        return (
            [data.map(createCard), data.map(createComment)]
        )
    }
}

export default Detailed;