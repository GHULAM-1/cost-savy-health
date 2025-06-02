export default function Card({
  title,
  description,
  icon: Icon,
  iconColor,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-lg p-6 sm:p-8 lg:p-8 border-2 transition-all duration-300 hover:shadow-sm">
      <div
        className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 ${iconColor} rounded-lg p-3 mb-5`}
      >
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>

      <h2 className="text-xl font-tiempos sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
        {title}
      </h2>

      <p className="text-gray-600 text-sm sm:text-base mb-4">{description}</p>

      <a
        href="#"
        className="text-gray-900 font-medium hover:underline inline-block transition-colors duration-200"
      >
        Learn More
      </a>
    </div>
  );
}
