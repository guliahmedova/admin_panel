const userrolePermissions = [
    {
        "id": 1,
        "name": 'Admin',
        "pers": [
            "Users",
            "AddUsers",
            "EditUser",
            "SellCar",
            "Bookings",
            "Settings"
        ]
    },
    {
        "id": 2,
        "name": 'Editor',
        "pers": [
            "Users",
            "AddUsers",
            "EditUser"
        ]
    },
    {
        "id": 3,
        "name": 'User',
        "pers": [
            "Bookings",
            "Settings"
        ]
    }
]


export default userrolePermissions;
