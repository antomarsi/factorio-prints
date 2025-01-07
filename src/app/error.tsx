"use client";
import { Panel, PanelInset } from "@/app/components/Panel";

export default function Error () {
    return <Panel title="Ops - Something went wrong" className="medium-center">
        <PanelInset>
            <p>There was an error processing your request</p>
        </PanelInset>
    </Panel>;
}
