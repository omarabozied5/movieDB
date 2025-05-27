import React from "react";
import { Award, Users } from "lucide-react";

interface CastCrewProps {
  director?: string;
  writer?: string;
  actors?: string;
}

export const CastCrew: React.FC<CastCrewProps> = ({
  director,
  writer,
  actors,
}) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-800">
      Cast & Crew
    </h2>
    <div className="space-y-6">
      {director && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Director
          </h3>
          <p className="text-gray-300 text-lg">{director}</p>
        </div>
      )}
      {writer && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-primary mb-3">Writer</h3>
          <p className="text-gray-300 text-lg">{writer}</p>
        </div>
      )}
      {actors && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Cast
          </h3>
          <p className="text-gray-300 text-lg">{actors}</p>
        </div>
      )}
    </div>
  </div>
);

export default CastCrew;
