interface ProfileButton {
    className: string;
    text: string;
    next: boolean;
    classNext: string;
}

export const profileButton: ProfileButton[] = [
    {
        className: 'icon-1',
        text: 'Settings',
        next: false,
        classNext: '',
    },
    {
        className: 'icon-2',
        text: 'Exit',
        next: false,
        classNext: '',
    },
];
