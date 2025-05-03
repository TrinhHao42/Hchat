import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { BsSend, BsPersonCircle, BsEmojiSmile, BsPaperclip, BsThreeDotsVertical } from "react-icons/bs";
import Header from "../components/Header";
import Menu from "../components/Menu";

const ChatRoom = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, text: "Xin chào!", time: "10:00 AM", sender: "Anna" },
        { id: 2, text: "Chào bạn! Bạn khỏe không?", time: "10:01 AM", sender: "User123" },
        { id: 3, text: "Mình khỏe, cảm ơn bạn đã hỏi thăm!", time: "10:02 AM", sender: "khongbiet" },
        { id: 4, text: "Hôm nay bạn đã làm gì?", time: "10:03 AM", sender: "User123" },
        { id: 5, text: "Mình vừa hoàn thành một dự án thiết kế website và đang nghỉ ngơi một chút. Còn bạn thì sao?", time: "10:05 AM", sender: "Anna" },
    ]);
    const [username, setUsername] = useState("User123");
    const messageEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle sending a new message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === "") return;

        const newMessage = {
            id: messages.length + 1,
            text: message,
            sender: username,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages([...messages, newMessage]);
        setMessage("");
    };

    return (
        <>
            <Header isLoggedIn={true} username={username} />
            <div className="d-flex">
                <Menu />
                <div
                    style={{
                        height: "calc(106.5vh - 60px)", // 60px is the estimated height of Header
                        display: "flex",
                        flexDirection: "column",
                        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ef 100%)",
                        overflow: "hidden", // Prevent scrolling on container level
                        width: "100%",
                    }}
                >
                    {/* Main Chat Area - This will flex and fill available space */}
                    <div className="flex-grow-1 px-4 py-3 overflow-hidden">
                        <Card
                            className="h-100 border-0 rounded-4 shadow-sm"
                            style={{
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <Card.Body className="d-flex flex-column p-4 h-100">
                                <div
                                    className="flex-grow-1 overflow-auto"
                                    style={{
                                        scrollbarWidth: "thin",
                                    }}
                                >
                                    <div className="text-center mb-4">
                                        <span className="badge bg-light text-secondary px-3 py-2 rounded-pill">Hôm nay</span>
                                    </div>

                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`d-flex mb-3 ${msg.sender === username ? "justify-content-end" : "justify-content-start"}`}
                                        >
                                            {msg.sender !== username && (
                                                <div className="me-2 align-self-end">
                                                    <div className="position-relative">
                                                        <BsPersonCircle size={36} color="#5468ff" />
                                                        <span className="position-absolute bg-success rounded-circle"
                                                            style={{ width: "8px", height: "8px", bottom: "1px", right: "1px", border: "1px solid white" }}></span>
                                                    </div>
                                                </div>
                                            )}
                                            <div style={{ maxWidth: "70%" }}>
                                                {msg.sender !== username && (
                                                    <div className="mb-1 ms-1">
                                                        <small className="text-muted">{msg.sender}</small>
                                                    </div>
                                                )}
                                                <div
                                                    className="px-3 py-2"
                                                    style={{
                                                        borderRadius: msg.sender === username ? "18px 18px 0 18px" : "18px 18px 18px 0",
                                                        backgroundColor: msg.sender === username ? "#5468ff" : "#f0f2f5",
                                                        color: msg.sender === username ? "#ffffff" : "#212529",
                                                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                                        wordBreak: "break-word",
                                                        fontSize: "15px",
                                                        lineHeight: "1.4",
                                                    }}
                                                >
                                                    {msg.text}
                                                </div>
                                                <small
                                                    className={`d-block mt-1 text-muted ${msg.sender === username ? "text-end" : "text-start"}`}
                                                    style={{ fontSize: "11px" }}
                                                >
                                                    {msg.time}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messageEndRef} />
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    {/* Message Input - This will stay fixed at bottom */}
                    <div className="px-4 pb-3">
                        <Card
                            className="border-0 rounded-4 shadow-sm"
                            style={{
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <Card.Body className="p-3">
                                <Form onSubmit={handleSendMessage}>
                                    <InputGroup className="align-items-center">
                                        <Button
                                            variant="light"
                                            className="border-0 rounded-circle text-muted me-2"
                                            style={{ width: "40px", height: "40px" }}
                                        >
                                            <BsPaperclip />
                                        </Button>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nhập tin nhắn của bạn..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="border-0 bg-light"
                                            style={{
                                                borderRadius: "20px",
                                                padding: "0.75rem 1rem",
                                            }}
                                        />
                                        <Button
                                            variant="light"
                                            className="border-0 rounded-circle text-muted mx-2"
                                            style={{ width: "40px", height: "40px" }}
                                        >
                                            <BsEmojiSmile />
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                backgroundColor: "#5468ff",
                                                border: "none",
                                                width: "46px",
                                                height: "46px",
                                            }}
                                        >
                                            <BsSend />
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatRoom;