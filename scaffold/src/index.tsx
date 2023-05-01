import React from 'react';
import { createRoot } from 'react-dom/client';

import driver from './driver';

import { Console, Terminal } from 'react-gamefic';
import { Activity, Conclusion, Default, MultipleChoice, Pause, YesOrNo } from './scenes';
import { Menu } from './widgets';

import 'react-gamefic/styles/ebook';
import './style.css';
import './modal.css';

const namedScenes = {}

const typedScenes = {
	Activity: Activity,
	Conclusion: Conclusion,
	Default: Default,
	MultipleChoice: MultipleChoice,
	Pause: Pause,
	YesOrNo: YesOrNo
}

const root = createRoot(document.getElementById('root'));
root.render(
	<Console className="console" driver={driver} withConsoleCommands={true}>
		<Menu />
		<Terminal className="terminal" namedScenes={namedScenes} typedScenes={typedScenes} />
	</Console>
);
