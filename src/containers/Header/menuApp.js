export const adminMenu = [
    { //hệ thống
        name: 'Người dùng',
        menus: [
            {
                name: 'Quản lý user ', link: '/system/user-manage',

            }, {
                name: 'Quản lý user redux', link: '/system/product-manage',
            },
            {
                name: 'Quản lý bác sĩ', link: '/system/manage-doctor',
            },
            {
                name: 'Quản lý lịch khám ', link: '/doctor',
            }
        ]
    },
    { //hệ thống
        name: 'Phòng khám',
        menus: [
            {
                name: 'Quản lý phòng khám ', link: '/system/user-clinics',

            }
        ]
    },
    { //hệ thống
        name: 'Lịch khám',
        menus: [
            {
                name: 'Quản lý lịch khám ', link: '/system/user-booking',

            }
        ]
    },
    { //hệ thống
        name: 'Chuyên khoa',
        menus: [
            {
                name: 'Quản lý chuyên khoa ', link: '/system/user-specialty',

            }
        ]
    },


];
export const doctorMenu = [
    { //hệ thống
        name: 'Quản lý người dùng',
        menus: [
            {
                name: 'Quản lý lịch khám ', link: '/doctor/manage-doctor',
            }, {
                name: 'Lịch khám của bệnh nhân', link: '/doctor/manage-patient',

            }
        ]
    },

];