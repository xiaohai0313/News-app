import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import Bounceloader from "react-spinners/BounceLoader";
import { Row} from "react-bootstrap";
function createCard(item) {
    return (
        <Card
            key={item.key}
            Image={item.image}
            Description={item.description}
            Section={item.section}
            Date={item.date}
            Title={item.title}
            Dlink={item.d_link}
            Source={item.source}
            Shareurl={item.shareurl}
        />
    )
}

function Page(props) {
    const [data, setData] = useState([]);
    const NYTdefaultimg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const Gurdiandefaultimg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    let url = ""
    if (props.sources === 'G') {
        if (props.local === 'home') { url = 'https://h8appbackend.appspot.com/api/Gurdian?cate=all' }//url = 'http://localhost:7000/Gurdian?cate=all' }
       // else { url = 'http://localhost:7000/Gurdian?cate=' + props.local }
       else { url = 'https://h8appbackend.appspot.com/api/Gurdian?cate=' + props.local }
    }
    else if (props.sources == 'N') {
        if (props.local === 'home') {url = 'https://h8appbackend.appspot.com/api/NYTime?cate=all' } //url = 'http://localhost:7000/NYTime?cate=all' }
        //else { url = 'http://localhost:7000/NYTime?cate=' + props.local }
        else { url = 'https://h8appbackend.appspot.com/api/NYTime?cate=' + props.local }
    }
   
    const [loader, setload] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url
            );
            setload(false);
          
            if (props.sources == 'G') {
                for (var i = 0; i < result.data.response.results.length; i++) {
                    let cur_img = "";

                    if (result.data.response.results[i].blocks.main != null && result.data.response.results[i].blocks.main.elements[0] != null && result.data.response.results[i].webTitle != null && result.data.response.results[i].blocks.body[0].bodyTextSummary != null && result.data.response.results[i].blocks.body[0].bodyTextSummary.length !== 0
                        && result.data.response.results[i].sectionId != null && result.data.response.results[i].webPublicationDate != null && result.data.response.results[i].id != null && result.data.response.results[i].webUrl != null) {
                     
                        if (result.data.response.results[i].blocks.main.elements[0].assets.length != 0) {
                            cur_img = result.data.response.results[i].blocks.main.elements[0].assets[result.data.response.results[i].blocks.main.elements[0].assets.length - 1].file;
                        }
                        else {
                            cur_img = Gurdiandefaultimg;
                        }
                        if (result.data.response.results[i] !== null) {
                            setData(data => [...data, {
                                key: result.data.response.results[i].id,
                                title: result.data.response.results[i].webTitle,
                                image: cur_img,
                                description: result.data.response.results[i].blocks.body[0].bodyTextSummary,
                                section: result.data.response.results[i].sectionId,
                                date: result.data.response.results[i].webPublicationDate.substring(0, 10),
                                d_link: result.data.response.results[i].id,
                                source: props.sources,
                                shareurl: result.data.response.results[i].webUrl
                            }
                            ]);
                        }
                    }
                };
            }
            else if (props.sources == 'N') {
             
                for (var i = 0; i < result.data.results.length; i++) {
                    if (result.data.results[i] !== null && result.data.results[i].multimedia != null && result.data.results[i].title != null && result.data.results[i].abstract != null && result.data.results[i].section != null &&
                        result.data.results[i].published_date != null && result.data.results[i].url != null && result.data.results[i].abstract.length != 0) {
                        let cur_img = "";
                        for (var j = 0; j < result.data.results[i].multimedia.length; j++) {
                            if (result.data.results[i].multimedia[j].width > 2000) {
                                cur_img = result.data.results[i].multimedia[j].url;
                                break
                            }
                            if (cur_img == "") {
                                cur_img = NYTdefaultimg;
                            }
                        }
                        setData(data => [...data, {
                            key: result.data.results[i].url,
                            title: result.data.results[i].title,
                            image: cur_img,
                            description: result.data.results[i].abstract,
                            section: result.data.results[i].section,
                            date: result.data.results[i].published_date.substring(0, 10),
                            d_link: result.data.results[i].url,
                            source: props.sources,
                            shareurl: result.data.results[i].url
                        }
                        ]);
                    }
                }
            }
        };
        fetchData();
    }, []);
   
    let screen_width = window.screen.width;
    let style = null;
    if (screen_width < 900) { style = { position: "fixed", paddingTop: "60%", left: "50%", transform: "translate(-50%, -50%)" }; }
    else { style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }; }
    if (loader) {
        return (<div style={style}><Bounceloader css={{margin:'auto'}} size={60} color={"#123abc"} loading={loader} /><h4 style={{ fontWeight: '600',textAlign:'center' }}>Loading</h4></div>)
    }
    else {
        return (
            data.map(createCard)
        )
    }
}




export default Page;


