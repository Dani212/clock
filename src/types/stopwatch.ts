export type StopwatchLapProps = {
	lap: string;
	lapTime: string;
	overallTime: string;
};

/**
 * @name SWStatusProps stop watch status props
 */
export type SWStatusProps = 'active' | 'inactive' | 'paused';

/**
 * @name SWHTRefProps stop watch ref props
 */
export type SWHTRefProps = {
	start: () => void;
	stop: () => void;
	reset: () => void;
	startLap: () => void;
};
