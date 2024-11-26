import { Panel, PanelInset } from "@/app/components/Panel";

export default function NotFound () {
    return <Panel title="404 - Page not found" className="medium-center">
        <PanelInset>
            <p>This page is missing.</p>
        </PanelInset>
    </Panel>;
}
