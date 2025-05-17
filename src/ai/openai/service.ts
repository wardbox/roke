import OpenAI from 'openai'
import { RateLimiter } from 'limiter'

// Default configuration
const DEFAULT_MODEL = 'o3-mini'
const DEFAULT_MAX_COMPLETION_TOKENS = 4096
const DEFAULT_RATE_LIMIT_TOKENS_PER_INTERVAL = 3
const DEFAULT_RATE_LIMIT_INTERVAL = 'second'

interface OpenAIServiceConfig {
  apiKey?: string
  model?: string
  maxTokens?: number
  rateLimitTokensPerInterval?: number
  rateLimitInterval?: 'second' | 'minute' | 'hour' | number
}

export class OpenAIService {
  private static instance: OpenAIService
  private openai: OpenAI
  private limiter: RateLimiter
  private model: string
  private maxTokens: number

  private constructor(config: OpenAIServiceConfig = {}) {
    const apiKey = config.apiKey || process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error(
        'OpenAI API key is not provided. Please set OPENAI_API_KEY environment variable or pass it in config.',
      )
    }
    this.openai = new OpenAI({ apiKey })

    this.model = config.model || DEFAULT_MODEL
    this.maxTokens = config.maxTokens || DEFAULT_MAX_COMPLETION_TOKENS

    this.limiter = new RateLimiter({
      tokensPerInterval:
        config.rateLimitTokensPerInterval ||
        DEFAULT_RATE_LIMIT_TOKENS_PER_INTERVAL,
      interval: config.rateLimitInterval || DEFAULT_RATE_LIMIT_INTERVAL,
    })
  }

  static getInstance(config?: OpenAIServiceConfig): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService(config)
    }
    return OpenAIService.instance
  }

  private cleanJsonResponse(response: string): string {
    try {
      JSON.parse(response)
      return response
    } catch {
      let cleanedResponse = response.trim()

      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.substring(7)
      }
      if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.substring(3)
      }
      if (cleanedResponse.endsWith('```')) {
        cleanedResponse = cleanedResponse.substring(
          0,
          cleanedResponse.length - 3,
        )
      }
      cleanedResponse = cleanedResponse.trim()

      try {
        JSON.parse(cleanedResponse)
        return cleanedResponse
      } catch (e) {
        console.error(
          'Failed to clean JSON response even after basic attempts:',
          e,
        )
        console.error(
          'Original problematic response snippet:',
          response.substring(0, 500) + '...',
        )
        return cleanedResponse
      }
    }
  }

  async generateOutput(prompt: string, responseType?: string): Promise<string> {
    try {
      await this.limiter.removeTokens(1)

      const needsJsonResponse = !!responseType

      console.log('🤖 Making chat completion with model:', this.model)
      const completion = await this.openai.responses.create({
        model: this.model,
        input: prompt,
        max_output_tokens: this.maxTokens,
      })

      const outputText = completion.output_text || ''
      console.log('Raw API response content:', outputText)

      if (needsJsonResponse) {
        if (!outputText) {
          console.error('❌ Empty response content from OpenAI API')
          throw new Error('Empty response content from OpenAI API')
        }
        try {
          const potentiallyCleanedJson = this.cleanJsonResponse(outputText)
          const parsedJson = JSON.parse(potentiallyCleanedJson)
          return JSON.stringify(parsedJson)
        } catch (e) {
          console.error(
            'Failed to process or parse AI response as valid JSON:',
            e,
          )
          console.error('Output text that failed parsing:', outputText)
          throw new Error(
            'Failed to process or parse AI response as valid JSON',
          )
        }
      }

      return outputText
    } catch (error: any) {
      console.error('❌ Error in chat completion:', error)
      if (error instanceof OpenAI.APIError) {
        let message = `OpenAI API error: ${error.message} (Status: ${error.status}, Type: ${error.type})`
        if (error.status === 429) {
          message =
            'Rate limit exceeded for OpenAI API. Please try again later.'
        } else if (error.status === 401) {
          message =
            'OpenAI API authentication error. Please check your API key.'
        } else if (error.status === 400 && error.code === 'invalid_api_key') {
          message =
            'Invalid OpenAI API key provided. Please verify your API key.'
        }
        throw new Error(message)
      }
      throw error
    }
  }
}
