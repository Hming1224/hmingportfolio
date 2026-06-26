import fs from 'fs';
import path from 'path';

const expPath = path.resolve('components/design-system/DesignSystemExplorer.tsx');
let expContent = fs.readFileSync(expPath, 'utf8');

expContent = expContent.replace(/<div style=\{\{ width: "min\(var\(--hm-container\), calc\(100% - 96px\)\)", margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax\(0, 1fr\)", gap: "var\(--hm-space-xl\)", marginTop: "var\(--hm-space-2xl\)", alignItems: "flex-start" \}\} style=\{\{ marginTop: "var\(--hm-space-2xl\)", alignItems: "flex-start" \}\}>/, '<div style={{ width: "min(var(--hm-container), calc(100% - 96px))", margin: "0 auto", display: "grid", gridTemplateColumns: "260px minmax(0, 1fr)", gap: "var(--hm-space-xl)", marginTop: "var(--hm-space-2xl)", alignItems: "flex-start" }}>');
expContent = expContent.replace(/<aside style=\{\{ position: "sticky", top: "80px", maxHeight: "calc\(100vh - 100px\)", overflowY: "auto" \}\} style=\{\{ position: "sticky", top: "80px", maxHeight: "calc\(100vh - 100px\)", overflowY: "auto" \}\}>/, '<aside style={{ position: "sticky", top: "80px", maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}>');
expContent = expContent.replace(/<nav style=\{\{ display: "flex", flexDirection: "column", gap: 0 \}\} style=\{\{ display: "flex", flexDirection: "column", gap: "0" \}\}>/, '<nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>');
expContent = expContent.replace(/<nav style=\{\{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" \}\} style=\{\{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" \}\}>/, '<nav style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "8px 0" }}>');
expContent = expContent.replace(/<div style=\{\{ flex: 1, minWidth: 0, display: "grid", gap: "var\(--hm-space-xl\)" \}\} style=\{\{ flex: 1, minWidth: 0 \}\}>/, '<div style={{ flex: 1, minWidth: 0, display: "grid", gap: "var(--hm-space-xl)" }}>');

fs.writeFileSync(expPath, expContent, 'utf8');
