import React from "react";
import { Panel, PanelInset } from "../../components/Panel";
import Button from "../../components/Button";

const MostRecentPage: React.FC = () => {
    return (
        <>
            <Panel title="Most Recent">
                <PanelInset dark>
                    <input placeholder="Search..." type="text" />
                    <Button type="submit" green="right" title="Search" />
                </PanelInset>
            </Panel>
        </>
    );
};

export default MostRecentPage;
