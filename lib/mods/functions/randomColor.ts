

  export const generateRandomColor = (shade: number): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    const opacity = Math.min(Math.max(shade, 10), 100) / 100;
    return `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
  };
  

  // Example usage:
  interface options {
        shade?: number;
        length?: number;
  };
export function randomColors({ length = 50, shade = 100 } : options) {
    const random = Array.from({ length }, () => generateRandomColor(shade));
    return random;
}
