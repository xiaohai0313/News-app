import React, { useState, useEffect } from "react"
import { Search_page_card, Bookmark_page_card } from "./Card"
import axios from "axios";
import Bounceloader from "react-spinners/BounceLoader";

function createCard(item) {
    //console.log("Imhere")
    return (
        <Bookmark_page_card
            key={item.key}
            Image={item.image}
            
            Title={item.title}
            Date={item.date}
            Dlink={item.dlink}
            Source={item.source}
            Section={item.section}
            Mykey={item.mykey}
            Shareurl={item.shareurl}
        />
    )
}
//Description={item.description}

function Search_Result(props) {
    //console.log(props.location.state);
    var keyword = props.location.state.keyword;
    var source = props.location.state.source;
    const [data, setData] = useState([]);
    //console.log(source);
    const NYTdefaultimg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
    const Gurdiandefaultimg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
    var url = '';
    //console.log(url); bounceloader
    const [loader, setload] = useState(true);

    useEffect(() => {
        //setload(true);
        const fetchData = async (s) => {
            if (s === 'G') {
                //url = 'http://localhost:7000/Search?source=' + 'G' + "&keyword=" + keyword;
                url = 'https://h8appbackend.appspot.com/api/Search?source=' + 'G' + "&keyword=" + keyword;
                
            }
            else if (s === 'N') {
                //url = 'http://localhost:7000/Search?source=' + 'N' + "&keyword=" + keyword;
                url = 'https://h8appbackend.appspot.com/api/Search?source=' + 'N' + "&keyword=" + keyword;
                
            }
            const result = await axios(
                url
            );
            if (s === 'N')
                setload(false);
            //console.log(result);
            if (s == 'G') {
                for (let k = 0; k < result.data.response.results.length; k++) {
                    let cur_img = "";
                    //console.log(result.data.response.results[i].blocks.main.elements[0].assets.length);
                    //console.log(result.data.response.results[i].blocks.main.elements[0]);
                    if (result.data.response.results[k].webTitle != null && result.data.response.results[k].blocks.main != null && result.data.response.results[k].blocks.main.elements[0] != null && result.data.response.results[k].webPublicationDate != null &&
                        result.data.response.results[k].id != null && result.data.response.results[k].sectionId != null && result.data.response.results[k].webUrl != null) {
                        if (result.data.response.results[k].blocks.main.elements[0].assets.length != 0) {
                            cur_img = result.data.response.results[k].blocks.main.elements[0].assets[result.data.response.results[k].blocks.main.elements[0].assets.length - 1].file;
                        }
                        else {
                            cur_img = Gurdiandefaultimg;
                        }
                        setData(data => [...data, {
                            key: result.data.response.results[k].id,
                            title: result.data.response.results[k].webTitle,
                            image: cur_img,
                            date: result.data.response.results[k].webPublicationDate.substring(0, 10),
                            //description: result.data.response.results[k].blocks.body[k].bodyTextSummary,
                            dlink: result.data.response.results[k].id,
                            source: "G",
                            section: result.data.response.results[k].sectionId,
                            mykey: result.data.response.results[k].id,       //for some cardkey
                            shareurl: result.data.response.results[k].webUrl
                        }])
                    }
                }
            }
            else if (s == 'N') {
                for (let k = 0; k < result.data.response.docs.length; k++) {
                    let image_url = "";
                    if (result.data.response.docs[k].multimedia != null && result.data.response.docs[k].headline.main != null && result.data.response.docs[k].pub_date != null && result.data.response.docs[k].web_url != null
                        && result.data.response.docs[k].section_name != null && result.data.response.docs[k]._id != null) {
                        for (let i = 0; i < result.data.response.docs[k].multimedia.length; i++) {
                            if (result.data.response.docs[k].multimedia[i].width > 2000) {
                                if (result.data.response.docs[k].multimedia[i].url.substring(0, 5) === "image") {
                                    image_url = "https://nyt.com/" + result.data.response.docs[k].multimedia[i].url;
                                }
                                else {
                                    image_url = result.data.response.docs[k].multimedia[i].url;
                                }
                                break
                            }
                        }
                        if (image_url === "") {
                            image_url = NYTdefaultimg;
                        }

                        setData(data => [...data, {
                            key: result.data.response.docs[k]._id,
                            title: result.data.response.docs[k].headline.main,
                            image: image_url,
                            date: result.data.response.docs[k].pub_date.substring(0, 10),
                            //description: result.data.response.docs[k].abstract,
                            dlink: result.data.response.docs[k].web_url,
                            source: "N",
                            section: result.data.response.docs[k].section_name,
                            mykey: result.data.response.docs[k]._id,
                            shareurl: result.data.response.docs[k].web_url
                        }])
                    }
                }
            }
        }
        fetchData('G');
        fetchData('N');
    }, []);
    let screen_width = window.screen.width;
    let style = null;
    if (screen_width < 900) { style = { position: "fixed", paddingTop: "60%", left: "50%", transform: "translate(-50%, -50%)" }; }
    else { style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }; }
    
    //console.log("search data" , data);css={override}
    if (loader) {
        //console.log("once")
        return (<div style={style}><Bounceloader  size={60} color={"#123abc"} loading={loader} /><h4 style={{ fontWeight: '600', textAlign: 'center' }}>Loading</h4></div>)
    }
    else {
        return (
            [<h2>Results</h2>, data.map(createCard)]
        )
    }

}
//loader ? <ClipLoader css = { override } size = { 70 } color = { "#123abc" } loading = { isload }/> : 
export default Search_Result