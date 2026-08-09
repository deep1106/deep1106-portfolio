# Shayona N8N Workflows

This repository contains the production n8n workflow JSONs used for **Shayona Store** automation.

⚠️ **Security Note:** Sensitive values have been redacted. Before activating any workflow, replace the placeholders with your own credentials.

## Included Workflows

- `Barcode Extract - Date Folder to Google Sheet (Simple) (2).json`
- `Doc Creation Sari V2 Auto Trigger.json`
- `Shayona - Saree Missing Catalog 2 Image Generator (AI) .json`
- `Shayona Doc creation final for saree.json`
- `Shayona_-_Saree_Missing_Catalog_Image_Generator__AI__fixed.json`

## Setup Notes

- Attach Google Drive OAuth2 credentials where required.
- Update any redacted folder IDs, spreadsheet IDs, and API keys.
- Retry logic: Drive operations x3, AI generation x3 with 5s wait.
- Test each workflow manually before scheduling.

## Owner

Deep H Bhavsar — https://github.com/deep1106
