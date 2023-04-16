import React from 'react';
import { createRoot } from 'react-dom/client';

import { Console } from 'react-gamefic';
import { Activity, Conclusion, Pause, MultipleChoice, YesOrNo } from './scenes';
import driver from './driver';

import 'react-gamefic/styles/ebook';

const namedScenes = {}

const typedScenes = {
	Activity: Activity,
	Conclusion: Conclusion,
	MultipleChoice: MultipleChoice,
	Pause: Pause,
	YesOrNo: YesOrNo
}

const root = createRoot(document.getElementById('root'));
root.render(<Console driver={driver} namedScenes={namedScenes} typedScenes={typedScenes} />);
