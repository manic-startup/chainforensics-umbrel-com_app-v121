/**
 * Utility Functions Module
 * Common helper functions used across the application
 */

import { DONATION_ADDRESS } from './config.js';

/**
 * Format BTC amount with proper decimal places
 * @param {number} btc - Bitcoin amount
 * @returns {string} Formatted BTC string
 */
export function formatBTC(btc) {
    return btc ? btc.toFixed(8) : '0';
}

/**
 * Create a truncated value display with copy button
 * @param {string} fullValue - Full value to copy
 * @param {string} truncatedDisplay - Shortened display text
 * @param {string} uniqueId - Unique identifier for the copy button
 * @returns {string} HTML string with truncated value and copy button
 */
export function createTruncatedValue(fullValue, truncatedDisplay, uniqueId) {
    return '<span class="truncated-value" title="' + fullValue + '">' + truncatedDisplay + '</span>' +
           '<button class="copy-btn-inline" id="copy-' + uniqueId + '" onclick="window.copyToClipboard(\'' + fullValue + '\', \'copy-' + uniqueId + '\')">📋</button>';
}

/**
 * Copy text to clipboard with visual feedback
 * @param {string} text - Text to copy
 * @param {string} buttonId - Button ID for visual feedback
 */
export function copyToClipboard(text, buttonId) {
    navigator.clipboard.writeText(text).then(function() {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.classList.add('copied');
            btn.textContent = '✓';
            setTimeout(function() {
                btn.classList.remove('copied');
                btn.textContent = '📋';
            }, 2000);
        }
    }).catch(function(err) {
        console.error('Copy failed:', err);
    });
}

/**
 * Copy donation address with visual feedback
 */
export async function copyAddress() {
    const btn = document.getElementById('copy-btn');
    if (!btn) return;

    const originalText = '📋 Copy Address';

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(DONATION_ADDRESS);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = DONATION_ADDRESS;
            textArea.setAttribute('readonly', '');
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            textArea.style.top = '0';
            textArea.style.opacity = '0';

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (!successful) {
                throw new Error('Fallback copy failed');
            }
        }

        btn.classList.add('copied');
        btn.innerHTML = '✓ Copied!';

        setTimeout(function() {
            btn.classList.remove('copied');
            btn.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        console.error('Copy failed:', err);
        btn.classList.remove('copied');
        btn.innerHTML = 'Copy failed';

        setTimeout(function() {
            btn.innerHTML = originalText;
        }, 2000);
    }
}

/**
 * Toggle sidebar section collapse
 * @param {string} sectionId - ID of the section to toggle
 */
export function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.toggle('collapsed');
    }
}
