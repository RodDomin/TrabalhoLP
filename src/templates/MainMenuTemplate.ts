export default (fn: () => void): object[] => [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add car',
        click(): void {
          fn();
        },
      },
      {
        label: 'Remove car',
      },
    ],
  },
];
