import promptSync from 'prompt-sync';

const prompt = promptSync({sigint: true});

export const movementPrompt = () => {
    const movement = prompt('Wich way to move? ');
    return movement;
}
