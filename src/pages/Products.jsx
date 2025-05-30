import React from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth'; // Đảm bảo đã import signOut
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Products = () => {
    const navigate = useNavigate(); // Khởi tạo navigate

    const Logout = async () => {
        try {
            await signOut(auth); // Gọi hàm signOut của Firebase
            localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
            navigate('/'); // Chuyển hướng về trang chủ/đăng nhập
            alert("Đăng xuất thành công!");
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            alert("Đăng xuất thất bại. Vui lòng thử lại.");
        }
    };

    return (
        <div>
            <button onClick={Logout}>Log Out</button>
        </div>
    );
};

export default Products;