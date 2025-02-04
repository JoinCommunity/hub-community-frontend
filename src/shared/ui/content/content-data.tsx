import { Content } from "src/shared/ui/content";

interface ContentDataProps {
  data: any;
  name: string;
  description: string;
  children: React.ReactNode;
}

export default function ContentData({
  children,
  data,
  name,
  description,
}: ContentDataProps) {
  return (
    <>
      <Content.Space />
      <Content.Box className="col-span-12 p-6 md:col-span-6">
        <h1 className="text-4xl font-medium leading-tight sm:text-6xl">
          {name}
        </h1>
        <p className="mb-3 text-base">{description}</p>
        {children}
      </Content.Box>
      <Content.Box className="col-span-12 border border-zinc-700 p-6 md:col-span-6">
        <p className="text-lg">{name} Data</p>
        <div className="my-2" />
        <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
      </Content.Box>
      <Content.Space />
    </>
  );
}
