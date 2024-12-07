"use client";

import { getDetails } from "@/lib/mods/middlewares/getDetails";
import { AnimeDetails, process } from "@/lib/types/__anikii_api";
import Image from "@/ui/components/Image/Image";
import { Box, Card, Chip, Container, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  id: string;
};
interface details {
  data?: AnimeDetails;
  load?: process;
}

function AnimeDetailsSection({ id }: Props) {
  const [datas, setDatas] = useState<details>();

  const loadDetails = useCallback(async () => {
    let timing = 0;
    setDatas((dt) => ({
      ...dt,
      load: "loading",
    }));
    try {
      const data = await getDetails(id);
      setDatas({
        data,
        load: "done",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      if (timing < 4) {
        loadDetails();
        timing++;
      } else {
        setDatas((dt) => ({
          ...dt,
          load: "error",
        }));
      }
    }
  }, [id]);
  useEffect(() => {
    loadDetails();
  }, [loadDetails]);
  useEffect(() => {
    console.log(datas?.data);
  }, [datas]);
  return (
    <Box
      component="section"
      sx={{ bgcolor: "transparent", minHeight: "100vh" }}
    >
      {/* Hero Section */}
      <Box sx={{ position: "relative", height: { xs: "40vh", md: "60vh" } }}>
        <Card sx={{ height: "100%" }}>
          <Image
            className="!size-full"
            src={datas?.data?.image}
            alt={datas?.data?.title}
            width={600}
            height={600}
          />
        </Card>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "white",
              textAlign: "center",
              px: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: "bold",
            }}
          >
            {datas?.data?.title}
          </Typography>
        </Box>
      </Box>

      {/* Details Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* Type Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "grey.700", fontWeight: "bold" }}
            >
              Type
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {datas?.data?.type}
            </Typography>
          </Box>

          {/* Status Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "grey.700", fontWeight: "bold" }}
            >
              Status
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {datas?.data?.status}
            </Typography>
          </Box>

          {/* Released Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "grey.700", fontWeight: "bold" }}
            >
              Released
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {datas?.data?.released}
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Genres Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "grey.700", fontWeight: "bold" }}
          >
            Genres
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {datas?.data?.genres.split(",").map((genre, idx) => (
              <Chip
                key={idx}
                label={genre.trim()}
                sx={{
                  bgcolor: "blue.100",
                  color: "blue.800",
                  borderRadius: "16px",
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Summary Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: "grey.800", fontWeight: "bold" }}
          >
            Summary
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "grey.600", mt: 2, lineHeight: 1.6 }}
          >
            {datas?.data?.summary}
          </Typography>
        </Box>
      </Container>

      {/* Additional Info Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {/* Total Episodes Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "grey.700", fontWeight: "bold" }}
            >
              Total Episodes
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {datas?.data?.totalEpisodes}
            </Typography>
          </Box>

          {/* Other Name Section */}
          <Box
            sx={{
              flex: 1,
              minWidth: "250px",
              p: 4,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: "grey.700", fontWeight: "bold" }}
            >
              Other Name
            </Typography>
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              {datas?.data?.otherName}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AnimeDetailsSection;
