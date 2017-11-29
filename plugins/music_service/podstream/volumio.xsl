<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" indent="yes" encoding="UTF-8" omit-xml-declaration="yes"/>
<xsl:template match="/"><text><xsl:text>[</xsl:text><xsl:apply-templates select="rss/channel/item" /></text></xsl:template>
<xsl:template match="item">
<xsl:variable name="url" select="enclosure/@url"/>
<xsl:variable name="image" select="*[local-name() = 'image']/@href"/>
<xsl:choose>
    <xsl:when test="string-length($url) > 10 and string-length(pubDate) > 1">
        {
            "service":"webradio",
            "uri":"<xsl:value-of select="$url" />",
            "title":"<xsl:value-of select="translate(title, '&quot;', '`')"/> - <xsl:value-of select="pubDate" />",
            "albumart": "<xsl:value-of select="$image" />"
        }
    </xsl:when>
    <xsl:when test="string-length($url) > 10">
        {
            "service":"webradio",
            "uri":"<xsl:value-of select="$url" />",
            "title":"<xsl:value-of select="translate(title, '&quot;', '`')"/> - <xsl:value-of select="pubDate" />"
        }
    </xsl:when>
</xsl:choose>
<xsl:choose>
<xsl:when test="position()=last()">
    <xsl:text>]</xsl:text>
</xsl:when>
<xsl:when test="position() > 0">
    <xsl:text>,</xsl:text>
</xsl:when>
</xsl:choose>
</xsl:template>
</xsl:stylesheet>