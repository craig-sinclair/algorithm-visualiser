export const kmpAlgorithm = (input) => {
    const [text, pattern] = input.split('|');
    if (!text || !pattern) return []; 

    const m = pattern.length;
    const n = text.length;
    const steps = [];

    // Step 1: Create Border Table
    const border = new Array(m).fill(0);
    let i = 0;
    steps.push({
        description: `Initialize border table for pattern "${pattern}".`,
        data: { border: [...border], textIndex: -1, patternIndex: -1 },
    });

    for (let j = 1; j < m; j++) {
        while (i > 0 && pattern[i] !== pattern[j]) {
            steps.push({
                description: `Mismatch while building border table: Adjusting index using border table.`,
                data: { currentPatternIndex: j, border: [...border], textIndex: -1, patternIndex: j },
            });
            i = border[i - 1];
        }
        if (pattern[i] === pattern[j]) {
            i++;
        }
        border[j] = i;

        steps.push({
            description: `Update border table at index ${j}. Current prefix-suffix match length: ${i}.`,
            data: { currentPatternIndex: j, border: [...border], textIndex: -1, patternIndex: j },
        });
    }

    // Step 2: KMP Search
    let j = 0; 
    for (let i = 0; i < n; i++) {
        while (j > 0 && text[i] !== pattern[j]) {
            steps.push({
                description: `Mismatch at text[${i}] and pattern[${j}]: Adjusting pattern position using border table.`,
                data: {
                    textIndex: i,
                    patternIndex: j,
                    textChar: text[i],
                    patternChar: pattern[j],
                    border: [...border],
                },
            });
            j = border[j - 1];
        }
        if (text[i] === pattern[j]) {
            steps.push({
                description: `Match at text[${i}] and pattern[${j}].`,
                data: {
                    textIndex: i,
                    patternIndex: j,
                    textChar: text[i],
                    patternChar: pattern[j],
                },
            });
            j++;
        }

        if (j === m) {
            steps.push({
                description: `Pattern found at index ${i - m + 1}.`,
                data: {
                    matchIndex: i - m + 1,
                    matchedText: text.slice(i - m + 1, i + 1),
                    textIndex: i,
                    patternIndex: j - 1,
                },
            });
            break; 
        }
    }

    if (steps.every(step => step.data.matchIndex === undefined)) {
        steps.push({ description: 'Pattern not found in the text.', data: {} });
    }

    return steps;
};
