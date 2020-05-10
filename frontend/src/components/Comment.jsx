import React from 'react';
import commentBox from 'commentbox.io';
class Comment extends React.Component {
        constructor(props) {
            super(props);
           
        }
    componentDidMount() {
        
        this.removeCommentBox = commentBox('5750880796147712-proj', {
            className: 'commentbox', // the class of divs to look for
            defaultBoxId: 'commentbox', // the default ID to associate to the div
            tlcParam: 'tlc', // used for identifying links to comments on your page
            backgroundColor: null, // default transparent
            textColor: null, // default black
            subtextColor: null, // default grey
            singleSignOn: null, // enables Single Sign-On (for Professional plans only)
        })
    }

    componentWillUnmount() {
        this.removeCommentBox();
    }

    render() {
        return (
            <div className="commentbox" id={this.props.idi} />
        );
    }
}

export default Comment