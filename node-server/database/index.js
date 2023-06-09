const users = [
  {
    id: '1',
    username: 'janedoe',
    displayName: 'Jane Doe',
    email: 'jane.doe@permission.com',
    password: 'password',
    phoneNumber: '+2348030004001',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "User",
      entity: "isUser",
      permissions: [
        { name: "create", value: false, },
        { name: "readAll", value: false },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: false, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
  {
    id: '2',
    username: 'johndoe',
    displayName: 'John Doe',
    email: 'john.doe@permission.com',
    password: 'password',
    phoneNumber: '+2348030004002',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "User",
      entity: "isUser",
      permissions: [
        { name: "create", value: false, },
        { name: "readAll", value: false },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: false, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
  {
    id: '3',
    username: 'jackdoe',
    displayName: 'Jack Doe',
    email: 'jack.doe@permission.com',
    password: 'password',
    phoneNumber: '+2348030004003',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "User",
      entity: "isUser",
      permissions: [
        { name: "create", value: false, },
        { name: "readAll", value: false },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: false, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
  {
    id: '4',
    username: 'joydoe',
    displayName: 'Joy Doe',
    email: 'joy.doe@permission.com',
    password: 'password',
    phoneNumber: '+2348030004004',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "User",
      entity: "isUser",
      permissions: [
        { name: "create", value: false, },
        { name: "readAll", value: false },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: false, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
  {
    id: '5',
    username: 'jeffdoe',
    displayName: 'Jeff Doe',
    email: 'jeff.doe@permission.com',
    password: 'password',
    phoneNumber: '+2348030004005',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "User",
      entity: "isUser",
      permissions: [
        { name: "create", value: false, },
        { name: "readAll", value: false },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: false, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
  {
    id: '6',
    username: 'adminuser',
    displayName: 'Admin User',
    email: 'admin.user@permission.com',
    password: 'password',
    phoneNumber: '+2348030004006',
    photoURL: 'http://avatar.png',
    emailVerified: true,
    disabled: false,
    role: {
      name: "Admin",
      entity: "isAdmin",
      permissions: [
        { name: "create", value: true, },
        { name: "readAll", value: true, },
        { name: "read", value: true, },
        { name: "update", value: true, },
        { name: "delete", value: true, },
      ],
    },
    created_at: 1673431871000,
    updated_at: 1673431871000,
  },
];

module.exports = {
	users,
};