import { Link } from "react-router-dom";

const categoryColors = {
  "Artificial Intelligence": "bg-purple-100 text-purple-700",
  "Web Development":         "bg-blue-100 text-blue-700",
  "Embedded Systems":        "bg-orange-100 text-orange-700",
  "Cybersecurity":           "bg-red-100 text-red-700",
  "Aerospace Engineering":   "bg-sky-100 text-sky-700",
  "IoT & Automation":        "bg-green-100 text-green-700",
  "Data Science":            "bg-yellow-100 text-yellow-700",
  "Mobile Development":      "bg-pink-100 text-pink-700",
};

export default function ProjectCard({ project }) {

  const tags = project.tags ? project.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
  const colorClass = categoryColors[project.category] || "bg-gray-100 text-gray-700";

  return (
    <Link to={`/projects/${project.id}`} className="card group block">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
            <span className="text-white text-4xl font-bold opacity-30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Featured badge */}
        {project.isFeatured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            ⭐ Featured
          </span>
        )}

        {/* Award badge */}
        {project.award && (
          <span className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
            🏆 {project.award}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <span className={`badge ${colorClass} text-xs mb-3`}>
          {project.category}
        </span>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Team & Supervisor */}
        <div className="text-xs text-gray-400 mb-4 space-y-1">
          <p><span className="font-medium text-gray-600">Team:</span> {project.teamName}</p>
          <p><span className="font-medium text-gray-600">Supervisor:</span> {project.supervisorName}</p>
          {project.boothNumber && (
            <p><span className="font-medium text-gray-600">Booth:</span> {project.boothNumber}</p>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge bg-gray-100 text-gray-500 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Submitted by <span className="font-medium text-gray-600">{project.teamName}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}