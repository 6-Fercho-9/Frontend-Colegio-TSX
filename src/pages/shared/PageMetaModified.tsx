import { Helmet } from "react-helmet-async";

interface PageMetaModifiedProps {
  title: string;
  subtitle?: string;
  description: string;
  keywords?: string;
  author?: string;
}

const PageMetaModified = ({
  title,
  subtitle,
  description,
  keywords,
  author,
}: PageMetaModifiedProps) => {
  const fullTitle = subtitle ? `${title} - ${subtitle}` : title;
  const pageTitle = `Sistema Escolar | ${fullTitle}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
    </Helmet>
  );
};

export default PageMetaModified;
