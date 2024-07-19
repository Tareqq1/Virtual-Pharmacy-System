const AdminDetails = ({ admin }) => {
    return (
        <div className="user-details">
            <h4>{admin._id}</h4>
            <p>username: <strong>{admin.username}</strong></p>
            <p>email: <strong>{admin.email}</strong></p>
        </div>
    )
}
export default AdminDetails;