// src/app/procedures/[id]/page.tsx
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { generateMetadataTemplate } from "@/lib/metadata";
import { Metadata } from "next";
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[]>>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const proc = await client.fetch(
    groq`*[_type == "procedure" && _id == $id][0]{
      _id, title, averageCashPrice
    }`,
    { id: resolvedParams.id }
  );

  if (!proc) {
    return generateMetadataTemplate({ title: "Procedure Not Found" });
  }

  const title = `${proc.title} | Medical Procedure | Cost Savy Health`;
  const description = `Learn about ${proc.title}, a medical procedure with an average cash price of $${proc.averageCashPrice}. Compare costs and find detailed information about this procedure.`;
  const keywords = [
    proc.title,
    "medical procedure",
    "healthcare costs",
    "medical costs",
    "procedure pricing",
    "cash price",
    "healthcare pricing",
    "medical treatment",
    "healthcare procedure"
  ].filter(Boolean);

  return generateMetadataTemplate({
    title,
    description,
    keywords,
    url: `https://costsavyhealth.com/procedures/${proc._id}`,
  });
}
type Procedure = {
  _id: string;
  title: string;
  averageCashPrice: number;
  introduction: any[];
  sections: { heading: string; content: any[] }[];
  conclusion: any[];
};

export async function generateStaticParams() {
  const allIds = await client.fetch<string[]>(
    groq`*[_type == "procedure"]._id`
  );
  return allIds.map((id) => ({ id }));
}

export default async function ProcedurePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const proc: Procedure | null = await client.fetch(
    groq`
        *[_type == "procedure" && _id == $id][0]{
          _id, title, averageCashPrice,
          introduction, sections[]{heading, content}, conclusion
        }
      `,
    { id }
  );

  if (!proc) {
    return <p className="p-8">Procedure not found.</p>;
  }

  return (
    <>
      <article className="mx-auto max-w-3xl p-8 space-y-8">
        <div className="flex md:flex-row flex-col md:gap-2 gap-0 justify-between ">
          <header className="flex flex-col mb-0 items-center">
            <h1 className="text-4xl font-bold mb-4 font-tiempos">{proc.title}</h1>
            <section className="prose">
              <PortableText value={proc.introduction} />
            </section>
          </header>
          <div>
            <div className="bg-white shadow-xl p-8 flex items-center flex-col gap-3 rounded">
              <p className="text-2xl text-gray-600 font-tiempos">Average Cash Price</p>
              <p className="text-3xl font-semibold font-tiempos">${proc.averageCashPrice}</p>
            </div>
          </div>
        </div>
        <section className="space-y-6">
          <h2 className="text-xl font-bold font-tiempos">Procedure Information</h2>
          {proc?.sections?.map((sec, i) => (
            <div key={i} className="prose">
              <h3 className="text-2xl font-bold font-tiempos">{sec.heading}</h3>
              <PortableText value={sec.content} />
            </div>
          ))}
        </section>
        <section className="prose">
          <h2 className="text-2xl font-bold font-tiempos">Conclusion</h2>
          <PortableText value={proc.conclusion} />
        </section>
      </article>
      <section className="bg-[#6B1548] py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Are you a transparent provider or payer?
          </h2>
          <p className="text-white mb-8">
            There is a market for transparency. Let patients find you by
            claiming your provider page and listing your services. It only takes
            10 minutes.
          </p>
          <a href="/contact-us">
            <button className="bg-[#8C2F5D] hover:cursor-pointer text-white font-medium rounded-full px-6 py-3 transition">
              Get Started
            </button>
          </a>
        </div>
      </section>
    </>
  );
}
