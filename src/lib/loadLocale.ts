import fs from 'fs';
import path from 'path';

export function loadLocale(locale: string) {
    const dir = path.join(process.cwd(), 'locales', locale);

    if (!fs.existsSync(dir)) {
        throw new Error(`Locale directory not found: ${dir}`);
    }

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
    const messages: Record<string, any> = {};

    for (const file of files) {
        const filePath = path.join(dir, file);
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        // Merge top-level keys (es. "auth", "common", "meta")
        Object.assign(messages, content);
    }

    return messages;
}
