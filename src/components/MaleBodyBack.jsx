export default function MaleBodyBack({ painPoints, onBodyPartClick }) {
  const isPainPoint = (bodyPartId) => {
    return painPoints.find(p => p.bodyPartId === bodyPartId);
  };

  const getPainIntensity = (bodyPartId) => {
    const point = painPoints.find(p => p.bodyPartId === bodyPartId);
    return point ? point.intensity : null;
  };

  return (
    <svg viewBox="0 0 200 450" className="w-full h-auto max-w-sm">
      {/* Head (Back) */}
      <g onClick={() => onBodyPartClick('back-head', 'Head (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="100" cy="40" rx="25" ry="30"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-head') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-head') && (
          <text x="100" y="47" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-head')}
          </text>
        )}
      </g>

      {/* Neck (Back) */}
      <g onClick={() => onBodyPartClick('back-neck', 'Neck (Back)', 'back')} className="cursor-pointer">
        <rect
          x="85" y="70" width="30" height="25"
          rx="3"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-neck') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-neck') && (
          <text x="100" y="87" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-neck')}
          </text>
        )}
      </g>

      {/* Upper Back */}
      <g onClick={() => onBodyPartClick('back-upper', 'Upper Back', 'back')} className="cursor-pointer">
        <rect
          x="75" y="95" width="50" height="40"
          rx="5"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-upper') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-upper') && (
          <text x="100" y="120" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-upper')}
          </text>
        )}
      </g>

      {/* Mid Back */}
      <g onClick={() => onBodyPartClick('back-mid', 'Mid Back', 'back')} className="cursor-pointer">
        <rect
          x="78" y="135" width="44" height="35"
          rx="5"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-mid') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-mid') && (
          <text x="100" y="157" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-mid')}
          </text>
        )}
      </g>

      {/* Lower Back */}
      <g onClick={() => onBodyPartClick('back-lower', 'Lower Back', 'back')} className="cursor-pointer">
        <rect
          x="80" y="170" width="40" height="35"
          rx="5"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-lower') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-lower') && (
          <text x="100" y="192" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-lower')}
          </text>
        )}
      </g>

      {/* Right Shoulder (Back) */}
      <g onClick={() => onBodyPartClick('back-shoulder-right', 'Right Shoulder (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="70" cy="105" rx="18" ry="15"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-shoulder-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-shoulder-right') && (
          <text x="70" y="110" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-shoulder-right')}
          </text>
        )}
      </g>

      {/* Left Shoulder (Back) */}
      <g onClick={() => onBodyPartClick('back-shoulder-left', 'Left Shoulder (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="130" cy="105" rx="18" ry="15"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-shoulder-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-shoulder-left') && (
          <text x="130" y="110" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-shoulder-left')}
          </text>
        )}
      </g>

      {/* Buttocks */}
      <g onClick={() => onBodyPartClick('back-buttocks', 'Buttocks', 'back')} className="cursor-pointer">
        <ellipse
          cx="100" cy="220" rx="30" ry="25"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-buttocks') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-buttocks') && (
          <text x="100" y="227" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-buttocks')}
          </text>
        )}
      </g>

      {/* Right Upper Arm (Back) */}
      <g onClick={() => onBodyPartClick('back-upper-arm-right', 'Right Upper Arm (Back)', 'back')} className="cursor-pointer">
        <rect
          x="45" y="120" width="18" height="55"
          rx="9"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-upper-arm-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-upper-arm-right') && (
          <text x="54" y="152" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-upper-arm-right')}
          </text>
        )}
      </g>

      {/* Left Upper Arm (Back) */}
      <g onClick={() => onBodyPartClick('back-upper-arm-left', 'Left Upper Arm (Back)', 'back')} className="cursor-pointer">
        <rect
          x="137" y="120" width="18" height="55"
          rx="9"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-upper-arm-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-upper-arm-left') && (
          <text x="146" y="152" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-upper-arm-left')}
          </text>
        )}
      </g>

      {/* Right Elbow (Back) */}
      <g onClick={() => onBodyPartClick('back-elbow-right', 'Right Elbow (Back)', 'back')} className="cursor-pointer">
        <circle
          cx="54" cy="180" r="10"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-elbow-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-elbow-right') && (
          <text x="54" y="185" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-elbow-right')}
          </text>
        )}
      </g>

      {/* Left Elbow (Back) */}
      <g onClick={() => onBodyPartClick('back-elbow-left', 'Left Elbow (Back)', 'back')} className="cursor-pointer">
        <circle
          cx="146" cy="180" r="10"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-elbow-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-elbow-left') && (
          <text x="146" y="185" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-elbow-left')}
          </text>
        )}
      </g>

      {/* Right Forearm (Back) */}
      <g onClick={() => onBodyPartClick('back-forearm-right', 'Right Forearm (Back)', 'back')} className="cursor-pointer">
        <rect
          x="48" y="190" width="12" height="50"
          rx="6"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-forearm-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-forearm-right') && (
          <text x="54" y="220" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-forearm-right')}
          </text>
        )}
      </g>

      {/* Left Forearm (Back) */}
      <g onClick={() => onBodyPartClick('back-forearm-left', 'Left Forearm (Back)', 'back')} className="cursor-pointer">
        <rect
          x="140" y="190" width="12" height="50"
          rx="6"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-forearm-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-forearm-left') && (
          <text x="146" y="220" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-forearm-left')}
          </text>
        )}
      </g>

      {/* Right Hand (Back) */}
      <g onClick={() => onBodyPartClick('back-hand-right', 'Right Hand (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="54" cy="252" rx="10" ry="12"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-hand-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-hand-right') && (
          <text x="54" y="257" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-hand-right')}
          </text>
        )}
      </g>

      {/* Left Hand (Back) */}
      <g onClick={() => onBodyPartClick('back-hand-left', 'Left Hand (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="146" cy="252" rx="10" ry="12"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-hand-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-hand-left') && (
          <text x="146" y="257" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-hand-left')}
          </text>
        )}
      </g>

      {/* Right Hamstring */}
      <g onClick={() => onBodyPartClick('back-hamstring-right', 'Right Hamstring', 'back')} className="cursor-pointer">
        <rect
          x="82" y="245" width="16" height="80"
          rx="8"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-hamstring-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-hamstring-right') && (
          <text x="90" y="290" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-hamstring-right')}
          </text>
        )}
      </g>

      {/* Left Hamstring */}
      <g onClick={() => onBodyPartClick('back-hamstring-left', 'Left Hamstring', 'back')} className="cursor-pointer">
        <rect
          x="102" y="245" width="16" height="80"
          rx="8"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-hamstring-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-hamstring-left') && (
          <text x="110" y="290" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-hamstring-left')}
          </text>
        )}
      </g>

      {/* Right Calf */}
      <g onClick={() => onBodyPartClick('back-calf-right', 'Right Calf', 'back')} className="cursor-pointer">
        <rect
          x="84" y="340" width="13" height="70"
          rx="6"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-calf-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-calf-right') && (
          <text x="90.5" y="380" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-calf-right')}
          </text>
        )}
      </g>

      {/* Left Calf */}
      <g onClick={() => onBodyPartClick('back-calf-left', 'Left Calf', 'back')} className="cursor-pointer">
        <rect
          x="103" y="340" width="13" height="70"
          rx="6"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-calf-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-calf-left') && (
          <text x="109.5" y="380" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-calf-left')}
          </text>
        )}
      </g>

      {/* Right Foot (Back) */}
      <g onClick={() => onBodyPartClick('back-foot-right', 'Right Foot (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="90" cy="422" rx="12" ry="10"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-foot-right') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-foot-right') && (
          <text x="90" y="427" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-foot-right')}
          </text>
        )}
      </g>

      {/* Left Foot (Back) */}
      <g onClick={() => onBodyPartClick('back-foot-left', 'Left Foot (Back)', 'back')} className="cursor-pointer">
        <ellipse
          cx="110" cy="422" rx="12" ry="10"
          stroke="#D1D5DB" strokeWidth="2" strokeDasharray="4 4"
          fill={isPainPoint('back-foot-left') ? '#FB923C' : 'transparent'}
          className="transition-all duration-200 hover:fill-orange-100"
        />
        {isPainPoint('back-foot-left') && (
          <text x="110" y="427" textAnchor="middle" className="text-base font-bold fill-gray-800">
            {getPainIntensity('back-foot-left')}
          </text>
        )}
      </g>
    </svg>
  );
}
