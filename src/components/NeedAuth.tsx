import { Panel, PanelInset } from "./Panel";

export default function NeedAuth () {
    return (
        <Panel title='You are not logged'>
            <PanelInset>
                <p>Please log in with Google or GitHub in order to continue</p>
            </PanelInset>
        </Panel>
    );
}
