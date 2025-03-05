import yaml from 'js-yaml'

export const generateFrontmatter = (data, fields) => {
  // Filter data to only include specified fields
  const frontmatterData = {}
  fields.forEach(field => {
    if (data[field] !== undefined) {
      frontmatterData[field] = data[field]
    }
  })
  
  // Convert to YAML
  const yamlString = yaml.dump(frontmatterData)
  
  // Return formatted frontmatter
  return `---\n${yamlString}---`
}

export const parseFrontmatter = (markdown) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/
  const match = markdown.match(frontmatterRegex)
  
  if (!match) return { frontmatter: {}, content: markdown }
  
  try {
    const frontmatterYaml = match[1]
    const frontmatter = yaml.load(frontmatterYaml) || {}
    const content = markdown.replace(frontmatterRegex, '').trim()
    
    return { frontmatter, content }
  } catch (error) {
    console.error('Failed to parse frontmatter:', error)
    return { frontmatter: {}, content: markdown }
  }
}

export const updateFrontmatter = (markdown, newData, fields) => {
  const { frontmatter, content } = parseFrontmatter(markdown)
  
  // Merge existing frontmatter with new data
  const updatedFrontmatter = { ...frontmatter }
  
  Object.keys(newData).forEach(key => {
    if (fields.includes(key)) {
      updatedFrontmatter[key] = newData[key]
    }
  })
  
  // Generate new frontmatter
  const newFrontmatter = generateFrontmatter(updatedFrontmatter, fields)
  
  // Return updated markdown
  return `${newFrontmatter}\n\n${content}`
}
