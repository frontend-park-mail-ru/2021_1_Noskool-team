interface ProfileButton {
    className: string;
    text: string;
    next: boolean;
    classNext: string;
}

export const settingButtons: ProfileButton[] = [
    {
        className: 'icon-3',
        text: 'Theme: light',
        next: true,
        classNext: 'next',
    },
    {
        className: 'icon-4',
        text: 'Help',
        next: false,
        classNext: '',
    },
    {
        className: 'icon-5',
        text: 'Language: En',
        next: true,
        classNext: 'next',
    },
];
