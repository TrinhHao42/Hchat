// Sidebar.js
import React, {useState} from 'react'
import { Nav, Image } from 'react-bootstrap'
import {
    BsChatDotsFill,
    BsPeopleFill,
    BsCheckSquareFill,
    BsCloudFill,
    BsCloud,
    BsBriefcaseFill,
    BsGearFill
} from 'react-icons/bs'

const Menu = () => {
    const menuItemsChat = [
        { icon: <BsChatDotsFill /> },
        { icon: <BsPeopleFill /> },
        { icon: <BsCheckSquareFill /> }
    ]

    const menuItemsSettings = [
        { icon: <BsCloud /> },
        { icon: <BsBriefcaseFill /> },
        { icon: <BsGearFill /> }
    ]

    const [isDisplay, setIsDisplay] = useState(true)
    const handleDisplay = (show) => {
        setIsDisplay(show)
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '100px', height: '100vh', backgroundColor: '#007bff', color: 'white' }} className="d-flex flex-column align-items-center py-3">
                <Image
                    src="/logo.png"
                    roundedCircle
                    width={70}
                    height={70}
                    className="border border-white mb-4"
                />
                <Nav className="flex-column w-100 align-items-center">
                    {menuItemsChat.map((item, idx) => (
                        <Nav.Link key={idx} className="text-white py-2" style={{ fontSize: '2rem' }} onClick={() => handleDisplay(true)}>
                            {item.icon}
                        </Nav.Link>
                    ))}
                </Nav>
                <Nav className="flex-column w-100 align-items-center mt-auto">
                    {menuItemsSettings.map((item, idx) => (
                        <Nav.Link key={idx} className="text-white py-2" style={{ fontSize: '2rem' }} onClick={() => handleDisplay(true)}>
                            {item.icon}
                        </Nav.Link>
                    ))}
                </Nav>
            </div>
            {
                !isDisplay ? null : (
                    <div style={{ flex: 1, width: '400px', backgroundColor: 'white', position: 'relative'}}>
                        <i class="bi bi-box-arrow-in-left" onClick={() => {handleDisplay(false)}} style={{position:'absolute', top:'10px', right: '10px', fontSize:'2rem', cursor:'pointer'}}></i>
                    </div>
                )
            }
        </div>
    )
}

export default Menu
