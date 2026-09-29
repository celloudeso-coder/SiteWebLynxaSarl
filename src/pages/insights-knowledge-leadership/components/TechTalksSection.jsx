import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import { getTechTalks } from "../../../lib/cms";
import SectionLoadError from "./SectionLoadError";


const TechTalksSection = ({ activeCategory, searchQuery }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [techTalks, setTechTalks]         = useState([]);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getTechTalks()
      .then((data) => {
        setTechTalks((data || []).map((t) => ({
          ...t,
          videoId:     t.video_id     ?? t.videoId     ?? "",
          publishDate: t.publish_date ?? t.publishDate ?? "",
          tags: Array.isArray(t.tags) ? t.tags : [],
        })));
      })
      .catch(() => setLoadError(true));
  }, []);

  const filteredTechTalks = techTalks?.filter((talk) => {
    const matchesCategory =
      activeCategory === "all" || talk?.category === activeCategory;
    const matchesSearch =
      !searchQuery?.trim() ||
      talk?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.speaker?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      talk?.tags?.some((tag) =>
        tag?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  if (loadError) return <SectionLoadError title="Tech Talks" />;

  if (filteredTechTalks?.length === 0) {
    return null;
  }

  const handleVideoPlay = (talk) => {
    setSelectedVideo(talk);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-secondary mb-4">
            Tech <span className="text-gradient-orange">Talks</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Regardez nos experts partager leurs analyses lors de conférences et
            webinaires à travers le monde. Apprenez à partir d’expériences
            concrètes et de recherches de pointe.
          </p>
        </div>

        {/* Tech Talks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTechTalks?.map((talk, index) => (
            <motion.div
              key={talk?.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Video Thumbnail */}
              <div
                className="relative group cursor-pointer"
                onClick={() => handleVideoPlay(talk)}
              >
                <Image
                  src={talk?.thumbnail}
                  alt={talk?.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon
                      name="Play"
                      size={24}
                      className="ml-1"
                    />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {talk?.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {talk?.category?.replace("-", " ")}
                  </span>
                </div>
              </div>

              {/* Video Content */}
              <div className="p-6">
                {/* Video Title */}
                <h3 className="text-lg font-heading font-bold text-secondary mb-2 line-clamp-2">
                  {talk?.title}
                </h3>

                {/* Speaker and Event */}
                <div className="text-sm text-gray-600 mb-3">
                  <p className="font-medium">{talk?.speaker}</p>
                  <p className="text-gray-500">{talk?.event}</p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {talk?.description}
                </p>

                {/* Video Stats */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Icon name="Eye" size={16} className="mr-2" />
                  <span className="mr-4">
                    {talk?.views?.toLocaleString()} vues
                  </span>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  <span>
                    {new Date(talk?.publishDate)?.toLocaleDateString()}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {talk?.tags?.slice(0, 3)?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Watch Button */}
                <Button
                  onClick={() => handleVideoPlay(talk)}
                  variant="default"
                  size="sm"
                  iconName="Play"
                  iconPosition="left"
                  className="w-full glow-orange"
                >
                  Regardez Maintenant
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-heading font-bold text-secondary">
                  {selectedVideo?.title}
                </h3>
                <button
                  onClick={closeVideoModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              {/* Video Player */}
              <div className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
                  {selectedVideo?.videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedVideo?.videoId}?autoplay=1&rel=0`}
                      title={selectedVideo?.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-center text-white">
                      <div>
                        <Icon name="Play" size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Vidéo indisponible</p>
                        <p className="text-sm text-gray-300">Durée: {selectedVideo?.duration}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Video Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">
                      Intervenant
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedVideo?.speaker}
                    </p>

                    <h4 className="font-semibold text-secondary mb-2">
                      Événement
                    </h4>
                    <p className="text-gray-600 mb-4">{selectedVideo?.event}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-secondary mb-2">
                      Description
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {selectedVideo?.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {selectedVideo?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-heading font-bold text-secondary mb-4">
              Vous souhaitez intervenir lors de nos événements ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Partagez votre expertise avec la communauté tech africaine. Nous
              recherchons toujours des intervenants innovants pour présenter
              lors de nos conférences et webinaires.
            </p>
            <Button
              variant="default"
              size="lg"
              iconName="Mic"
              iconPosition="left"
              className="glow-orange"
            >
              Postuler pour intervenir
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechTalksSection;
