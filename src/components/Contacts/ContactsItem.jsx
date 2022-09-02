import React from 'react';

function ContactsItem({img, name, lastMessage, id, date, contactsItemHeandler, active, arrIdNewMessage}) {
    return (
        <div className={`contactsItem ${active === id ? 'active' : ''}`} onClick={contactsItemHeandler}>
            <div className="userFoto checked">
                <img src={require(`../../img/${img}`)} alt='userFoto' loading="lazy" height="50" width="50"/>
                {
                    arrIdNewMessage.find(item => item === id)
                        ? <svg viewBox="0 0 64 64" ><circle cx="32" cy="32" r="30" fill="#fff"/><path d="M32,2C15.432,2,2,15.432,2,32c0,16.568,13.432,30,30,30s30-13.432,30-30C62,15.432,48.568,2,32,2z M38,48h-6.107V24.979  c-2.232,2.086-4.863,3.629-7.893,4.629v-5.543c1.594-0.521,3.326-1.512,5.195-2.967c1.871-1.455,3.152-3.156,3.848-5.098H38V48z" fill="#fe0000"/></svg>
                        : <svg x="0px" y="0px" viewBox="0 0 305.002 305.002"> <g> <path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/> <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/> </g> </svg>
                }
            </div>
            <div className="textBlock">
                <div className="name">{name}</div>
                <div className="lastMessage">{lastMessage}</div>
            </div>
            <div className="date">{date}</div>
        </div>
    );
}

export default ContactsItem;
