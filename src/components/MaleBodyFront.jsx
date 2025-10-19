export default function MaleBodyFront({ painPoints, onBodyPartClick, selectedBodyPart }) {
  const isPainPoint = (bodyPartId) => {
    return painPoints.find(p => p.bodyPartId === bodyPartId);
  };

  const getPainIntensity = (bodyPartId) => {
    const point = painPoints.find(p => p.bodyPartId === bodyPartId);
    return point ? point.intensity : null;
  };

  const getPainColor = (bodyPartId) => {
    const point = painPoints.find(p => p.bodyPartId === bodyPartId);
    if (!point) return 'transparent';

    const intensity = point.intensity;
    if (intensity <= 3) {
      return '#FDE047'; // Yellow for mild pain
    } else if (intensity <= 6) {
      return '#FB923C'; // Orange for moderate pain
    } else {
      return '#EF4444'; // Red for severe pain
    }
  };

  const isSelected = (bodyPartId) => {
    return selectedBodyPart === bodyPartId;
  };

  const getStrokeProps = (bodyPartId) => {
    if (isSelected(bodyPartId)) {
      return {
        stroke: "#000000",
        strokeWidth: "4",
        strokeDasharray: ""
      };
    }
    return {
      stroke: "#D1D5DB",
      strokeWidth: "2",
      strokeDasharray: "4 4"
    };
  };

  return (
    <svg viewBox="0 0 200 450" className="w-full h-auto max-w-sm">
      {/* Head */}
      <g
        onClick={() => onBodyPartClick('front-head', 'Head', 'front')}
        className="cursor-pointer"
      >
        <ellipse
          cx="100"
          cy="40"
          rx="25"
          ry="30"
          {...getStrokeProps('front-head')}
          fill={getPainColor('front-head')}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-head') && (
          <text x="100" y="47" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('front-head')}
          </text>
        )}
      </g>

      {/* Neck */}
      <g
        onClick={() => onBodyPartClick('front-neck', 'Neck', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="85"
          y="70"
          width="30"
          height="20"
          rx="3"
          {...getStrokeProps('front-neck')}
          fill={getPainColor('front-neck') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-neck') && (
          <text x="100" y="85" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-neck')}
          </text>
        )}
      </g>

      {/* Right Shoulder */}
      <g
        onClick={() => onBodyPartClick('front-right-shoulder', 'Right shoulder', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="70"
          cy="100"
          r="12"
          {...getStrokeProps('front-right-shoulder')}
          fill={getPainColor('front-right-shoulder') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-shoulder') && (
          <text x="70" y="105" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-right-shoulder')}
          </text>
        )}
      </g>

      {/* Left Shoulder */}
      <g
        onClick={() => onBodyPartClick('front-left-shoulder', 'Left shoulder', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="130"
          cy="100"
          r="12"
{...getStrokeProps('front-left-shoulder')}
          fill={getPainColor('front-left-shoulder') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-shoulder') && (
          <text x="130" y="105" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-left-shoulder')}
          </text>
        )}
      </g>

      {/* Upper Chest */}
      <g
        onClick={() => onBodyPartClick('front-upper-chest', 'Upper chest', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="75"
          y="90"
          width="50"
          height="35"
          rx="8"
{...getStrokeProps('front-upper-chest')}
          fill={getPainColor('front-upper-chest') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-upper-chest') && (
          <text x="100" y="112" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('front-upper-chest')}
          </text>
        )}
      </g>

      {/* Mid Chest */}
      <g
        onClick={() => onBodyPartClick('front-mid-chest', 'Mid chest', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="80"
          y="125"
          width="40"
          height="30"
          rx="6"
{...getStrokeProps('front-mid-chest')}
          fill={getPainColor('front-mid-chest') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-mid-chest') && (
          <text x="100" y="145" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-mid-chest')}
          </text>
        )}
      </g>

      {/* Upper Abdomen */}
      <g
        onClick={() => onBodyPartClick('front-upper-abdomen', 'Upper abdomen', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="80"
          y="155"
          width="40"
          height="30"
          rx="6"
{...getStrokeProps('front-upper-abdomen')}
          fill={getPainColor('front-upper-abdomen') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-upper-abdomen') && (
          <text x="100" y="175" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-upper-abdomen')}
          </text>
        )}
      </g>

      {/* Lower Abdomen */}
      <g
        onClick={() => onBodyPartClick('front-lower-abdomen', 'Lower abdomen', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="82"
          y="185"
          width="36"
          height="35"
          rx="6"
{...getStrokeProps('front-lower-abdomen')}
          fill={getPainColor('front-lower-abdomen') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-lower-abdomen') && (
          <text x="100" y="207" textAnchor="middle" className="text-sm font-bold fill-gray-800">
            {getPainIntensity('front-lower-abdomen')}
          </text>
        )}
      </g>

      {/* Right Upper Arm */}
      <g
        onClick={() => onBodyPartClick('front-right-upper-arm', 'Right upper arm', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="48"
          y="100"
          width="18"
          height="60"
          rx="9"
{...getStrokeProps('front-right-upper-arm')}
          fill={getPainColor('front-right-upper-arm') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-upper-arm') && (
          <text x="57" y="135" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-upper-arm')}
          </text>
        )}
      </g>

      {/* Left Upper Arm */}
      <g
        onClick={() => onBodyPartClick('front-left-upper-arm', 'Left upper arm', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="134"
          y="100"
          width="18"
          height="60"
          rx="9"
{...getStrokeProps('front-left-upper-arm')}
          fill={getPainColor('front-left-upper-arm') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-upper-arm') && (
          <text x="143" y="135" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-upper-arm')}
          </text>
        )}
      </g>

      {/* Right Elbow */}
      <g
        onClick={() => onBodyPartClick('front-right-elbow', 'Right elbow', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="57"
          cy="165"
          r="8"
{...getStrokeProps('front-right-elbow')}
          fill={getPainColor('front-right-elbow') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-elbow') && (
          <text x="57" y="169" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-elbow')}
          </text>
        )}
      </g>

      {/* Left Elbow */}
      <g
        onClick={() => onBodyPartClick('front-left-elbow', 'Left elbow', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="143"
          cy="165"
          r="8"
{...getStrokeProps('front-left-elbow')}
          fill={getPainColor('front-left-elbow') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-elbow') && (
          <text x="143" y="169" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-elbow')}
          </text>
        )}
      </g>

      {/* Right Forearm */}
      <g
        onClick={() => onBodyPartClick('front-right-forearm', 'Right forearm', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="49"
          y="173"
          width="16"
          height="55"
          rx="8"
{...getStrokeProps('front-right-forearm')}
          fill={getPainColor('front-right-forearm') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-forearm') && (
          <text x="57" y="205" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-forearm')}
          </text>
        )}
      </g>

      {/* Left Forearm */}
      <g
        onClick={() => onBodyPartClick('front-left-forearm', 'Left forearm', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="135"
          y="173"
          width="16"
          height="55"
          rx="8"
{...getStrokeProps('front-left-forearm')}
          fill={getPainColor('front-left-forearm') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-forearm') && (
          <text x="143" y="205" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-forearm')}
          </text>
        )}
      </g>

      {/* Right Hand */}
      <g
        onClick={() => onBodyPartClick('front-right-hand', 'Right hand', 'front')}
        className="cursor-pointer"
      >
        <ellipse
          cx="57"
          cy="238"
          rx="10"
          ry="12"
{...getStrokeProps('front-right-hand')}
          fill={getPainColor('front-right-hand') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-hand') && (
          <text x="57" y="243" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-hand')}
          </text>
        )}
      </g>

      {/* Left Hand */}
      <g
        onClick={() => onBodyPartClick('front-left-hand', 'Left hand', 'front')}
        className="cursor-pointer"
      >
        <ellipse
          cx="143"
          cy="238"
          rx="10"
          ry="12"
{...getStrokeProps('front-left-hand')}
          fill={getPainColor('front-left-hand') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-hand') && (
          <text x="143" y="243" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-hand')}
          </text>
        )}
      </g>

      {/* Right Thigh */}
      <g
        onClick={() => onBodyPartClick('front-right-thigh', 'Right thigh', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="82"
          y="220"
          width="16"
          height="80"
          rx="8"
{...getStrokeProps('front-right-thigh')}
          fill={getPainColor('front-right-thigh') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-thigh') && (
          <text x="90" y="265" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-thigh')}
          </text>
        )}
      </g>

      {/* Left Thigh */}
      <g
        onClick={() => onBodyPartClick('front-left-thigh', 'Left thigh', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="102"
          y="220"
          width="16"
          height="80"
          rx="8"
{...getStrokeProps('front-left-thigh')}
          fill={getPainColor('front-left-thigh') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-thigh') && (
          <text x="110" y="265" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-thigh')}
          </text>
        )}
      </g>

      {/* Right Knee */}
      <g
        onClick={() => onBodyPartClick('front-right-knee', 'Right knee', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="90"
          cy="305"
          r="10"
{...getStrokeProps('front-right-knee')}
          fill={getPainColor('front-right-knee') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-knee') && (
          <text x="90" y="310" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-knee')}
          </text>
        )}
      </g>

      {/* Left Knee */}
      <g
        onClick={() => onBodyPartClick('front-left-knee', 'Left knee', 'front')}
        className="cursor-pointer"
      >
        <circle
          cx="110"
          cy="305"
          r="10"
{...getStrokeProps('front-left-knee')}
          fill={getPainColor('front-left-knee') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-knee') && (
          <text x="110" y="310" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-knee')}
          </text>
        )}
      </g>

      {/* Right Shin */}
      <g
        onClick={() => onBodyPartClick('front-right-shin', 'Right shin', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="83"
          y="315"
          width="14"
          height="80"
          rx="7"
{...getStrokeProps('front-right-shin')}
          fill={getPainColor('front-right-shin') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-shin') && (
          <text x="90" y="360" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-shin')}
          </text>
        )}
      </g>

      {/* Left Shin */}
      <g
        onClick={() => onBodyPartClick('front-left-shin', 'Left shin', 'front')}
        className="cursor-pointer"
      >
        <rect
          x="103"
          y="315"
          width="14"
          height="80"
          rx="7"
{...getStrokeProps('front-left-shin')}
          fill={getPainColor('front-left-shin') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-shin') && (
          <text x="110" y="360" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-shin')}
          </text>
        )}
      </g>

      {/* Right Foot */}
      <g
        onClick={() => onBodyPartClick('front-right-foot', 'Right foot', 'front')}
        className="cursor-pointer"
      >
        <ellipse
          cx="90"
          cy="405"
          rx="12"
          ry="18"
{...getStrokeProps('front-right-foot')}
          fill={getPainColor('front-right-foot') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-right-foot') && (
          <text x="90" y="411" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-right-foot')}
          </text>
        )}
      </g>

      {/* Left Foot */}
      <g
        onClick={() => onBodyPartClick('front-left-foot', 'Left foot', 'front')}
        className="cursor-pointer"
      >
        <ellipse
          cx="110"
          cy="405"
          rx="12"
          ry="18"
{...getStrokeProps('front-left-foot')}
          fill={getPainColor('front-left-foot') }
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('front-left-foot') && (
          <text x="110" y="411" textAnchor="middle" className="text-xs font-bold fill-gray-800">
            {getPainIntensity('front-left-foot')}
          </text>
        )}
      </g>
    </svg>
  );
}
