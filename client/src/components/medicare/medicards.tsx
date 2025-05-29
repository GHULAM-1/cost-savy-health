interface Feature {
  image: string;
  heading: string;
  description: string;
}
type MedicareDoc = {
  _id: string;
  heading: string;
  description: string;
  number: string;
  imageUrl: string;
  featuresGrid: Feature[];
};

interface FeatureCardProps extends Feature {}

function FeatureCard({
  image,
  heading,
  description,
}: FeatureCardProps) {
  return (
    <div className="  overflow-hidden flex flex-col md:flex-row">
      {/* Image Section */}
      <div className=" bg-white rounded-lg shadow-lg md:w-[25%] flex justify-center items-center p-5">
        <img src={image} alt={heading} className="" />
      </div>
      {/* Text Section */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-3xl font-semibold mb-4 text-gray-900">{heading}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <button className="w-max px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Read more
        </button>
      </div>
    </div>
  );
}

interface FeaturesGridProps {
  items: MedicareDoc;
}

function FeaturesGrid({ items }: FeaturesGridProps) {
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {items.featuresGrid.map((item:any, index:any) => (
            <FeatureCard
              key={index}
              image={item.imageUrl}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesGrid;
