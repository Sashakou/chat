import React from 'react';
function Messages({value, date, img, is_contact_value}) {
    return (
        <div className={`message ${is_contact_value ? 'contactValue' : 'userValue'}`}>
            <div className="innerMessage">
                {is_contact_value ? <img src={require(`../../img/${img}`)} alt='userFoto' loading="lazy" height="50" width="50"/> : null}
                <div className="textBlock">
                    <div className="text">{value}</div>
                    <div className="date">{date}</div>
                </div>
            </div>
        </div>
    );
}

export default Messages;
