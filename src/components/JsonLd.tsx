interface JsonLdProps {
  data?: object | object[];
}

/** Serializes structured data safely: `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  if (!data) return null;
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
